import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import {
  FaEnvelope,
  FaLocationDot,
  FaLinkedin,
  FaGithub,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";

const ContactPage = () => {
  const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! I'll get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10 max-w-6xl">
        <BreadCrumbs data={breadCrumbsData} />
        {/* Header */}
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-800 mb-4">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-forest-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? I'd love to
            hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-forest-100 rounded-lg">
                  <FaEnvelope className="w-6 h-6 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 mb-2">Email</h3>
                  <a
                    href="mailto:sumanthhegde002@gmail.com"
                    className="text-slate-600 hover:text-forest-600 transition-colors duration-300 break-all"
                  >
                    sumanthhegde002@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-forest-100 rounded-lg">
                  <FaLocationDot className="w-6 h-6 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-forest-800 mb-2">
                    Location
                  </h3>
                  <p className="text-slate-600">
                    Sirsi, Karnataka
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-gradient-to-br from-forest-50 to-earth-50 rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-forest-800 mb-4">
                Connect on Social Media
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/sumanth-hegde-37805a2b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-300 group"
                >
                  <FaLinkedin className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 group-hover:text-blue-600">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://github.com/SumanthBHegde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-300 group"
                >
                  <FaGithub className="w-5 h-5 text-gray-800" />
                  <span className="text-slate-700 group-hover:text-gray-800">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://x.com/Hebhsum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-300 group"
                >
                  <FaSquareXTwitter className="w-5 h-5 text-black" />
                  <span className="text-slate-700 group-hover:text-black">
                    X (Twitter)
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/sumanth_hutgar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white hover:bg-pink-50 rounded-lg transition-colors duration-300 group"
                >
                  <FaSquareInstagram className="w-5 h-5 text-pink-600" />
                  <span className="text-slate-700 group-hover:text-pink-600">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">
                Send Me a Message
              </h2>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-forest-600 to-earth-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-forest-50">
                I typically respond to messages within 24-48 hours. If you need
                immediate assistance, feel free to reach out via social media!
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage;
