import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaCamera, FaTimes } from "react-icons/fa";
import AddressDetails from "./addressDetailsh.jsx";
import PersonalDetails from "./personalDetailsh.jsx";
import ReferAndEarn from "./refer&earn.jsx";
import RegisterUser from "../../backend/authentication/register.js";
import GetUser from "../../backend/authentication/getuser.js";
import TermsPage from "./terms&condition.jsx";
import AboutUs from "./aboutus.jsx";
import PrivacyAndPolicy from "./privacy&policy.jsx";
import EnterReferCode from "./enterrefercode.jsx";

const UserProfile = () => {
  const [openSections, setOpenSections] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await GetUser(phone);
        console.log("Fetched from the Navigation ", { fetchedUser });
        setUser(fetchedUser || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (phone) fetchUser();
  }, [phone]);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sections = [
    { id: 1, title: "Personal Details", Component: <PersonalDetails /> },
    { id: 2, title: "Saved Addresses", Component: <AddressDetails /> },
    { id: 3, title: "Refer & Earn", Component: <ReferAndEarn /> },
    { id: 4, title: "Enter Referral Code", Component: <EnterReferCode /> },
    // { id: 5, title: "Referred Friends", Component: <ReferAndEarn /> },
    { id: 5, title: "My Orders", Component: <AddressDetails /> },
    { id: 6, title: "About Us", Component: <AboutUs /> },
    { id: 7, title: "Terms & Conditions", Component: <TermsPage /> },
    { id: 8, title: "Privacy Policy", Component: <PrivacyAndPolicy /> },
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
        pureBase64Image,
        "Edit Profile Image",
        "",
        phone,
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[18px] sm:text-3xl font-normal text-gray-900 tracking-tight">
            My Profile
          </h1>
          <div className="w-20 h-1 bg-blue-500 rounded-full mt-2" />
        </motion.div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg cursor-pointer group"
          >
            <img
              src={
                user[0]?.Image
                  ? `https://weprettify.com/images/${user[0].Image}`
                  : "https://via.placeholder.com/150?text=Avatar"
              }
              alt={user[0]?.Fullname || "ProfileHXProfile"}
              className="w-full h-full object-cover group-hover:opacity-90 transition-all duration-300"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => setShowUploadModal(true)}
            >
              <FaCamera className="text-white text-xl sm:text-2xl" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl font-semibold text-gray-800 mt-4"
          >
            {user[0]?.Fullname || "User Profile"}
          </motion.h2>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: section.id * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div
                onClick={() => toggleSection(section.id)}
                className="p-4 sm:p-5 cursor-pointer flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
              >
                <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                  {section.title}
                </h3>
                <motion.div
                  animate={{ rotate: openSections[section.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openSections[section.id] ? (
                    <FaMinus className="text-sm" />
                  ) : (
                    <FaPlus className="text-sm" />
                  )}
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {openSections[section.id] && (
                  <motion.div
                    key={`section-${section.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="p-3 bg-gray-50"
                  >
                    {section.Component}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Upload Profile Picture
                </h2>
                <button
                  onClick={handleCancelUpload}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-6 border-2 border-gray-200 shadow-sm">
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
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Choose Image
                </button>
                {preview && (
                  <button
                    onClick={handleSaveAvatar}
                    className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-all duration-200 mt-4"
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
