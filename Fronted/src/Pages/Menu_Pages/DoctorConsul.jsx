import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios'
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Filter,
  Search,
  Video,
  User,
  Shield,
  Award,
  ChevronRight,
  Heart,
  CheckCircle
} from "lucide-react";

const DoctorConsult = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. A. Sharma",
      specialization: "Cardiologist",
      experience: "10+ Years",
      image: "https://imgs.search.brave.com/0mpQToBavUj-mXjWmDCj6lXhuF90R6HI3Jajo8vxGX8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEzLzQxLzQ3LzQz/LzM2MF9GXzEzNDE0/NzQzODhfa0Jmb2JV/Mnk0WVFJYlZ2S1g4/QXhtalpNZkZLdHpP/VUMuanBn",
      availability: "Available Today",
      contact: "9876543210",
      email: "asharma@hospital.com",
      fee: "₹500",
      rating: 4.8,
      reviews: 156,
      location: "Apollo Hospital, Mumbai",
      languages: ["English", "Hindi", "Marathi"],
      consultationType: ["In-person", "Video call"],
      nextSlot: "10:00 AM",
      badges: ["Verified", "Top Rated"],
      education: "MBBS, MD Cardiology",
      about: "Specialized in heart diseases with over 10 years of experience in cardiac surgery."
    },
    {
      id: 2,
      name: "Dr. Priya Verma",
      specialization: "Dermatologist",
      experience: "7+ Years",
      image: "https://imgs.search.brave.com/eLPp_lxkMQ3sfLociSzSPzCyQAxOwI__7hF83gYOtWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjY2/ODA2NDUwL3N0b2Nr/LXBob3RvLWRvY3Rv/ci13aGl0ZS1jb2F0/LXdyaXRpbmctY2xp/cGJvYXJkLWNsaW5p/Yw",
      availability: "Available Tomorrow",
      contact: "9876543211",
      email: "pverma@hospital.com",
      fee: "₹400",
      rating: 4.6,
      reviews: 89,
      location: "Fortis Hospital, Mumbai",
      languages: ["English", "Hindi"],
      consultationType: ["Video call", "In-person"],
      nextSlot: "2:30 PM",
      badges: ["Verified"],
      education: "MBBS, MD Dermatology",
      about: "Expert in skin disorders and cosmetic treatments with modern techniques."
    },
    {
      id: 3,
      name: "Dr. Nisha Mehra",
      specialization: "Orthopedic",
      experience: "12+ Years",
      image: "https://imgs.search.brave.com/1acyPE6xpAQhtJMV6b7jAFyXU0TCOft-RvVC3FKDPjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NjE3NjY3/MTg1NTYtMTNjMmVm/YWMxMzg4P2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjEuMCZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE9Y/eDhaRzlqZEc5eWMz/eGxibnd3Zkh3d2ZI/eDhNQT09",
      availability: "Available in 2 days",
      contact: "9876543212",
      email: "nmehra@hospital.com",
      fee: "₹600",
      rating: 4.9,
      reviews: 203,
      location: "Hinduja Hospital, Mumbai",
      languages: ["English", "Hindi", "Gujarati"],
      consultationType: ["In-person"],
      nextSlot: "11:30 AM",
      badges: ["Verified", "Top Rated", "Award Winner"],
      education: "MBBS, MS Orthopedics",
      about: "Leading orthopedic surgeon specializing in joint replacement and sports medicine."
    },
    {
      id: 4,
      name: "Dr. Nitin Gupta",
      specialization: "Orthopedic",
      experience: "12+ Years",
      image: "https://imgs.search.brave.com/42G18CwmchOMUN2yZBVgG3lfIVIYkKbS6JdfsbLcWDM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b25maWRlbnQtc2Vu/aW9yLWRvY3Rvci13/aXRoLWNsaXBib2Fy/ZF8yMy0yMTQ3ODk2/MTczLmpwZz9zZW10/PWFpc19pbmNvbWlu/ZyZ3PTc0MCZxPTgw",
      availability: "Available in 2 days",
      contact: "9876543213",
      email: "ngupta@hospital.com",
      fee: "₹550",
      rating: 4.7,
      reviews: 142,
      location: "KEM Hospital, Mumbai",
      languages: ["English", "Hindi"],
      consultationType: ["In-person", "Video call"],
      nextSlot: "3:00 PM",
      badges: ["Verified"],
      education: "MBBS, MS Orthopedics",
      about: "Experienced in bone and joint disorders with focus on minimally invasive procedures."
    },
  ];

  const url = "https://pharmacy-project-main.onrender.com"

  const Booked_Doctors = async (selectedDoctor) => {
    await axios.post(`${url}/booked_doctors`, {
      id: selectedDoctor.id,
      name: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      experience: selectedDoctor.experience,
      image: selectedDoctor.image,
      availability: selectedDoctor.availability,
      contact: selectedDoctor.contact,
      email: selectedDoctor.email,
      fee: selectedDoctor.fee,
      rating: selectedDoctor.rating,
      reviews: selectedDoctor.reviews,
      location: selectedDoctor.location,
      languages: selectedDoctor.languages,
      consultationType: selectedDoctor.consultationType,
      nextSlot: selectedDoctor.nextSlot,
      badges: selectedDoctor.badges,
      education: selectedDoctor.education,
      about: selectedDoctor.about
    })

      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })

    // console.log("ID:", selectedDoctor.id);
    // console.log("Name:", selectedDoctor.name);
    // console.log("Specialization:", selectedDoctor.specialization);
    // console.log("Experience:", selectedDoctor.experience);
    // console.log("Image:", selectedDoctor.image);
    // console.log("Availability:", selectedDoctor.availability);
    // console.log("Contact:", selectedDoctor.contact);
    // console.log("Email:", selectedDoctor.email);
    // console.log("Fee:", selectedDoctor.fee);
    // console.log("Rating:", selectedDoctor.rating);
    // console.log("Reviews:", selectedDoctor.reviews);
    // console.log("Location:", selectedDoctor.location);
    // console.log("Languages:", selectedDoctor.languages);
    // console.log("Consultation Type:", selectedDoctor.consultationType);
    // console.log("Next Slot:", selectedDoctor.nextSlot);
    // console.log("Badges:", selectedDoctor.badges);
    // console.log("Education:", selectedDoctor.education);
    // console.log("About:", selectedDoctor.about);
  }

  const specialties = ["all", "Cardiologist", "Dermatologist", "Orthopedic"];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialization === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setShowAnimation(false);
  };

  const handleBookAppointment = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setSelectedDoctor(null);
    }, 3000);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Verified": return "bg-green-100 text-green-800";
      case "Top Rated": return "bg-blue-100 text-blue-800";
      case "Award Winner": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen mt-15 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center ">


          {/* Search and Filter Bar */}
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Specialty Filter */}
              <div className="flex gap-2 flex-wrap">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${selectedSpecialty === specialty
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {specialty === "all" ? "All Specialties" : specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Doctor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Doctor Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                    />
                    {doctor.badges.includes("Verified") && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {doctor.specialization}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {doctor.fee}
                        </div>
                        <div className="text-sm text-gray-500">consultation</div>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{doctor.rating}</span>
                      </div>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doctor.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{doctor.experience} • {doctor.education}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Next available: {doctor.nextSlot}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Languages: {doctor.languages.join(", ")}</span>
                  </div>
                </div>

                {/* Consultation Types */}
                <div className="flex gap-2 mb-4">
                  {doctor.consultationType.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                    >
                      {type === "Video call" ? (
                        <Video className="w-3 h-3" />
                      ) : (
                        <MapPin className="w-3 h-3" />
                      )}
                      <span>{type}</span>
                    </div>
                  ))}
                </div>

                {/* Availability Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${doctor.availability === "Available Today"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${doctor.availability === "Available Today" ? "bg-green-500" : "bg-orange-500"
                      }`}></div>
                    <span className="text-sm font-medium">{doctor.availability}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="px-4 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or specialty filter to find more doctors.
            </p>
          </motion.div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animation Overlay */}
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-60 bg-black/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DotLottieReact
                    src="https://lottie.host/7ffec7d0-b5f9-4767-9c95-9118bb937750/pTNZrzbo6u.lottie"
                    autoplay
                    loop={false}
                    speed={1}
                    style={{
                      width: '300px',
                      height: '300px',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{
                opacity: showAnimation ? 0.3 : 1,
                scale: 1,
                y: 0,
                filter: showAnimation ? 'blur(4px)' : 'blur(0px)'
              }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                disabled={showAnimation}
              >
                <span className="text-gray-500 text-xl">✕</span>
              </button>

              {/* Doctor Profile */}
              <div className="text-center mb-6">
                <motion.div
                  className="relative inline-block mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mx-auto"
                  />
                  {selectedDoctor.badges.includes("Verified") && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedDoctor.name}
                </h2>
                <p className="text-blue-600 font-semibold text-lg mb-2">
                  {selectedDoctor.specialization}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{selectedDoctor.rating}</span>
                  </div>
                  <span className="text-gray-500">({selectedDoctor.reviews} reviews)</span>
                </div>

                {/* Badges */}
                <div className="flex justify-center gap-2 mb-6">
                  {selectedDoctor.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(badge)}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Doctor Details */}
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600 text-sm">{selectedDoctor.about}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Experience</span>
                    </div>
                    <p className="font-semibold text-gray-900">{selectedDoctor.experience}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">💰</span>
                      <span className="text-sm font-medium text-gray-600">Fee</span>
                    </div>
                    <p className="font-semibold text-gray-900">{selectedDoctor.fee}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedDoctor.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedDoctor.contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{selectedDoctor.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Next available: {selectedDoctor.nextSlot}</span>
                  </div>
                </div>
              </motion.div>

              {/* Book Button */}
              <motion.button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: showAnimation ? 1 : 1.02 }}
                onClick={() => {
                  handleBookAppointment();
                  Booked_Doctors(selectedDoctor);
                }}
                disabled={showAnimation}
              >
                {showAnimation ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Booking Appointment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Appointment Now
                  </div>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorConsult;
