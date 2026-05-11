import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchStations,
  addStation,
  updateStation,
  deleteStation,
} from "../../redux/reducer/station/stationSlice";
import StationStats from "../../component/admin/station/StationStats";
import StationTable from "../../component/admin/station/StationTable";
import StationModal from "../../component/admin/station/StationModal";

const StationManagement = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.stations);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([32.1877, 74.1945]);
  const [formData, setFormData] = useState({
    name: "",
    lat: 32.1877,
    lng: 74.1945,
    capacity: 20,
    address: "",
  });

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`,
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setFormData((prev) => ({
          ...prev,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClick = (station) => {
    setEditId(station._id);
    setFormData({
      name: station.name,
      lat: station.location.lat,
      lng: station.location.lng,
      capacity: station.capacity,
      address: station.address || "",
    });
    setMapCenter([station.location.lat, station.location.lng]);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStation(id)).then(() =>
          Toast.fire({ icon: "success", title: "Station deleted" }),
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      location: { lat: formData.lat, lng: formData.lng },
      capacity: Number(formData.capacity),
      address: formData.address,
    };
    const res = editId
      ? await dispatch(updateStation({ id: editId, ...payload }))
      : await dispatch(addStation(payload));

    if (res.meta.requestStatus === "fulfilled") {
      Toast.fire({ icon: "success", title: editId ? "Updated" : "Deployed" });
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({
      name: "",
      lat: 32.1877,
      lng: 74.1945,
      capacity: 20,
      address: "",
    });
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans">
      <StationStats
        totalStations={items.length}
        onAddClick={() => setShowModal(true)}
      />

      <div className="mt-6">
        <StationTable
          items={items}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>

      <StationModal
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editId={editId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        mapCenter={mapCenter}
      />
    </div>
  );
};

export default StationManagement;
