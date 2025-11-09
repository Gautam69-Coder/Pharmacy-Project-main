import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    Phone,
    Mail,
    MapPin,
    Star,
    Video,
    MessageCircle,
    FileText,
    Filter,
    Search,
    MoreVertical,
    CheckCircle,
    XCircle,
    AlertCircle
} from "lucide-react";
import axios from "axios";

const Doctors = () => {
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "https://pharmacy-project-main.onrender.com"

    // Fetch booked appointments from API
    useEffect(() => {
        const fetchBookedAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/booked_doctors`);
                console.log("API Response:", response.data);

                // Handle the response - if it's an array, use it directly, if it's an object with data property, use response.data.data
                const appointmentsData = Array.isArray(response.data) ? response.data : response.data.data || [];

                // Transform the data to match expected structure and add missing fields
                const transformedData = appointmentsData.map((appointment, index) => ({
                    id: appointment._id || appointment.id || `appointment-${index}`,
                    _id: appointment._id || appointment.id || `appointment-${index}`,
                    appointmentId: appointment.appointmentId || `APT-${Date.now()}-${index}`,
                    doctor: {
                        name: appointment.name || "Unknown Doctor",
                        specialization: appointment.specialization || "General Practitioner",
                        image: appointment.image || "/api/placeholder/64/64",
                        rating: appointment.rating || "4.5",
                        contact: appointment.contact || "Not Available",
                        email: appointment.email || "Not Available",
                        location: appointment.location || "Not Available"
                    },
                    appointmentDate: appointment.appointmentDate || appointment.createdAt || new Date().toISOString(),
                    appointmentTime: appointment.appointmentTime || appointment.nextSlot || "Not Available",
                    consultationType: appointment.consultationType || (appointment.consultationTypes && appointment.consultationTypes) || "In-person",
                    status: appointment.status || "upcoming", // Default status
                    fee: appointment.fee || "₹500",
                    bookedOn: appointment.bookedOn || appointment.createdAt || appointment.updatedAt || new Date().toISOString(),
                    symptoms: appointment.symptoms || "General consultation",
                    notes: appointment.notes || appointment.about || "No additional notes",
                    cancelReason: appointment.cancelReason || null
                }));

                setBookedAppointments(transformedData);
                setError(null);
            } catch (err) {
                console.error("Error fetching booked appointments:", err);
                setError("Failed to fetch appointments. Please try again later.");
                setBookedAppointments([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchBookedAppointments();
    }, []);

    // Filter appointments based on status and search term
    const filteredAppointments = bookedAppointments.filter(appointment => {
        const matchesFilter = selectedFilter === "all" || appointment.status === selectedFilter;
        const matchesSearch =
            appointment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctor?.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "upcoming": return "bg-blue-100 text-blue-800 border-blue-200";
            case "completed": return "bg-green-100 text-green-800 border-green-200";
            case "cancelled": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "upcoming": return <AlertCircle className="w-4 h-4" />;
            case "completed": return <CheckCircle className="w-4 h-4" />;
            case "cancelled": return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            return "N/A";
        }
    };

    const getAppointmentStats = () => {
        const total = bookedAppointments.length;
        const upcoming = bookedAppointments.filter(apt => apt.status === 'upcoming').length;
        const completed = bookedAppointments.filter(apt => apt.status === 'completed').length;
        const cancelled = bookedAppointments.filter(apt => apt.status === 'cancelled').length;
        return { total, upcoming, completed, cancelled };
    };

    const stats = getAppointmentStats();

    if (loading) {
        return (
            <div className="min-h-screen mt-20 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your appointments...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen mt-20 p-6 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-20 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Booked Doctors</h1>
                    <p className="text-gray-600">Manage and track all your medical appointments</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-lg">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by doctor name, specialization, or appointment ID..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2">
                            {["all", "upcoming", "completed", "cancelled"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === filter
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Appointments List */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment, index) => (
                                <motion.div
                                    key={appointment.id || appointment._id || `appointment-${index}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={appointment.doctor?.image || "/api/placeholder/64/64"}
                                                alt={appointment.doctor?.name || "Doctor"}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                                onError={(e) => {
                                                    e.target.src = "/api/placeholder/64/64";
                                                }}
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {appointment.doctor?.name || "Unknown Doctor"}
                                                </h3>
                                                <p className="text-gray-600">{appointment.doctor?.specialization || "General"}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm text-gray-600">{appointment.doctor?.rating || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusColor(appointment.status)}`}>
                                                {getStatusIcon(appointment.status)}
                                                <span className="font-medium capitalize">{appointment.status || "Unknown"}</span>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">
                                                    <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm">
                                                    <strong>Time:</strong> {appointment.appointmentTime || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                {appointment.consultationType === "Video call" ? (
                                                    <Video className="w-4 h-4" />
                                                ) : (
                                                    <MapPin className="w-4 h-4" />
                                                )}
                                                <span className="text-sm">
                                                    <strong>Type:</strong> {appointment.consultationType || "In-person"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FileText className="w-4 h-4" />
                                                <span className="text-sm">
                                                    <strong>ID:</strong> {appointment.appointmentId || appointment._id}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="text-sm">
                                                    <strong>Fee:</strong> {appointment.fee || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <span className="text-sm">
                                                    <strong>Booked On:</strong> {formatDate(appointment.bookedOn)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-gray-600">
                                                <p className="text-sm font-medium">Symptoms:</p>
                                                <p className="text-sm">{appointment.symptoms || "Not specified"}</p>
                                            </div>
                                            <div className="text-gray-600">
                                                <p className="text-sm font-medium">Notes:</p>
                                                <p className="text-sm">{appointment.notes || "No notes"}</p>
                                            </div>
                                            {appointment.status === "cancelled" && appointment.cancelReason && (
                                                <div className="text-red-600">
                                                    <p className="text-sm font-medium">Cancellation Reason:</p>
                                                    <p className="text-sm">{appointment.cancelReason}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                <span>{appointment.doctor?.contact || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                <span>{appointment.doctor?.email || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{appointment.doctor?.location || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {appointment.status === "upcoming" && (
                                                <>
                                                    <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                                                        Cancel
                                                    </button>
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                        Reschedule
                                                    </button>
                                                </>
                                            )}
                                            {appointment.status === "completed" && (
                                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                    View Report
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <MessageCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No appointments found</h3>
                                <p className="text-gray-600">
                                    {searchTerm || selectedFilter !== "all"
                                        ? "Try adjusting your search or filter criteria"
                                        : "You haven't booked any appointments yet"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
