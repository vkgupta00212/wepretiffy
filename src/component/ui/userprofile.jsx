import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaCamera, FaTimes } from "react-icons/fa";
import AddressDetails from "./addressDetailsh.jsx";
import PersonalDetails from "./personalDetailsh.jsx";
import RegisterUser from "../../backend/authentication/register.js";
import GetUser from "../../backend/authentication/getuser.js";

const UserProfile = () => {
  const [openSections, setOpenSections] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const mobile = localStorage.getItem("userPhone");

  useEffect(() => {
    const fetchuser = async () => {
      const data = await GetUser(mobile);
      setUser(data);
    };
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    { id: 1, title: "Personal Details", Component: <PersonalDetails /> },
    { id: 2, title: "Address Details", Component: <AddressDetails /> },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSaveAvatar = async () => {
    if (!preview) {
      alert("⚠️ Please select an image before saving.");
      return;
    }

    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("⚠️ No file selected.");
      return;
    }

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Remove "data:image/*;base64," part
          const base64String = reader.result.replace(
            /^data:image\/[a-zA-Z]+;base64,/,
            ""
          );
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });

    try {
      const pureBase64Image = await toBase64(file);

      const res = await RegisterUser(
        pureBase64Image, // Send only Base64 string
        "Edit Profile Image",
        "",
        mobile,
        "",
        "",
        ""
      );

      if (res) {
        setAvatar(preview);
        alert("✅ Profile image updated successfully!");
      } else {
        alert("❌ Failed to update image.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("❌ Error updating profile image.");
    }

    setShowUploadModal(false);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 md:mt-[50px] p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start mb-8"
        >
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-tight">
              Profile Section
            </h1>
            <div className="w-full h-[2px] bg-indigo-600 rounded-full mt-1" />
          </div>
        </motion.div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg cursor-pointer group"
          >
            <img
              src={
                user[0]?.Image
                  ? `https://weprettify.com/images/${user[0].Image}`
                  : "https://via.placeholder.com/150?text=Avatar"
              }
              alt={user[0]?.Fullname || "Profile"}
              className="w-11 h-11 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 transition-all duration-300"
            />

            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => setShowUploadModal(true)}
            >
              <FaCamera className="text-white text-2xl md:text-3xl" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg font-semibold text-gray-800 mt-4 tracking-tight"
          >
            Vishal Gupta
          </motion.h2>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: section.id * 0.1 }}
            className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
          >
            <div
              onClick={() => toggleSection(section.id)}
              className="p-5 cursor-pointer flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-2xl transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800"
            >
              <h3 className="font-semibold text-sm md:text-base tracking-tight">
                {section.title}
              </h3>
              {openSections[section.id] ? (
                <FaMinus className="text-sm" />
              ) : (
                <FaPlus className="text-sm" />
              )}
            </div>
            <AnimatePresence initial={false}>
              {openSections[section.id] && (
                <motion.div
                  key={`section-${section.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="p-5"
                  id={`section-${section.id}`}
                >
                  <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
                    {section.Component}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-800">
                  Upload Avatar
                </h2>
                <button
                  onClick={handleCancelUpload}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-sm md:text-base" />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-2 border-gray-200 shadow-sm">
                  <img
                    src={
                      preview ||
                      avatar ||
                      "https://via.placeholder.com/150?text=Preview"
                    }
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
                >
                  Choose Image
                </button>
                {preview && (
                  <button
                    onClick={handleSaveAvatar}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-3"
                  >
                    Save Avatar
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
