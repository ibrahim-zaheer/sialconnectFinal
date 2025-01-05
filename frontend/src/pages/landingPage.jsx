import React from "react";
import "../assets/css/landingPage.css";
import ProductImage from "../assets/images/image-1.jpg";
import Footer from "./footer";

import { useTranslation, Trans } from "react-i18next";
import LanguageSelector from "../components/language/language-selector";

export default function LandingPage() {
  // import this for language
  const { t } = useTranslation();

  return (
    <>
      <div className="text-[#1b263b] w-[80vw] mx-auto mt-20">
        {/* Language Selector */}
        <div className="w-full flex justify-end">
          <div className="w-fit bg-[#e0e1dd]">
            <LanguageSelector />
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero h-[90vh] w-full flex flex-col gap-8 justify-center items-center">
          <h1 className="text-6xl font-bold leading-tight w-[60%] text-center">
            {t("landingPage.mainHeading")}
          </h1>

          <p className="w-[50%] text-xl text-center">
            <h2>{t("landingPage.mainsecondHeading")}</h2>
          </p>

          <div className="flex gap-2">
            <input
              className="w-80 p-3 border border-[#1b263b]"
              type="text"
              placeholder="Search Product"
            />
            <button className="bg-[#1b263b] text-[#e0e1dd] hover:bg-[#415a77] transition-all duration-300 px-5 py-3">
              Search
            </button>
          </div>
        </div>

        {/* Best Selling Section */}
        <div className="selling my-12">
          <h1 className="text-4xl font-bold text-center mb-4">Best Selling</h1>
          <p className="text-center mb-8 text-gray-600">
            Get in on the trend with our curated selection of best-selling
            styles.
          </p>

          {/* Cards */}
          <div className="cards flex justify-center gap-5">
            {/* Card 1 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#1b263b] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Regular Fit Long Sleeve Top
                </h3>
                <p className="text-gray-700 font-semibold mb-2">$38.99</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <span className="text-sm">5.0</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#3e5c76] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Black Crop Tailored Jacket
                </h3>
                <p className="text-gray-700 font-semibold mb-2">$62.99</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <span className="text-sm">4.9</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#6d8ea0] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Textured Sunset Shirt
                </h3>
                <p className="text-gray-700 font-semibold mb-2">$49.99</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  <span className="text-sm">5.0</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* See All Button */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-[#1b263b] text-[#e0e1dd] hover:bg-[#415a77] rounded-lg transition-all duration-300">
              See all &rarr;
            </button>
          </div>
        </div>

        <div className="w-[80vw] bg-white my-24 text-white">
          <div className="w-[78%] mx-auto bg-[#1b263b] p-16">
            <h1 className="text-4xl font-bold">
            {t("mainBody.mainText")}
            </h1>
            <p className="my-4">
            {t("mainBody.bodyText")}
            </p>
            <div className="mt-5 flex gap-5">
              <button className="bg-white text-[#1b263b] py-1 px-2">
                Explore
              </button>
              <button className="text-white bg-[#1b263b] py-1 px-2 border border-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Best supplier Section */}
        <div className="selling my-12">
          <h1 className="text-4xl font-bold text-center mb-4">Best Supplier</h1>
          <p className="text-center mb-8 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque earum
            eaque commodi!
          </p>

          {/* Cards */}
          <div className="cards flex justify-center gap-5">
            {/* Card 1 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#1b263b] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Regular Fit Long Sleeve Top
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
                  sed.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#3e5c76] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Black Crop Tailored Jacket
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[300px] rounded-xl overflow-hidden shadow-lg">
              <div className="bg-[#6d8ea0] p-4 flex justify-center">
                <img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#1b263b] mb-2">
                  Textured Sunset Shirt
                </h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <section className="py-16 px-8 my-24">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-[#1b263b] mb-8">
            Feedback Corner
          </h2>

          {/* Feedback Cards */}
          <div className="flex justify-center gap-6 my-16">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[300px]">
              <span className="text-3xl font-bold text-[#415a77] mb-2">“</span>
              <h3 className="text-lg font-bold text-[#1b263b] mb-2">
                Emily Wilson
              </h3>
              <p className="text-gray-700 text-sm">
              {t("commentBody.bodyText1")}
              </p>
            </div>

            {/* Card 2 - Highlighted */}
            <div className="bg-gray-200 shadow-lg rounded-lg p-6 w-[300px]">
              <span className="text-3xl font-bold text-[#415a77] mb-2">“</span>
              <h3 className="text-lg font-bold text-[#1b263b] mb-2">
                Sarah Thompson
              </h3>
              <p className="text-gray-700 text-sm">
              {t("commentBody.bodyText2")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[300px]">
              <span className="text-3xl font-bold text-[#415a77] mb-2">“</span>
              <h3 className="text-lg font-bold text-[#1b263b] mb-2">
                Olivia Martinez
              </h3>
              <p className="text-gray-700 text-sm">
              {t("commentBody.bodyText3")}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="p-2 border border-gray-400 rounded-md hover:bg-gray-100">
              &larr;
            </button>
            <button className="p-2 border border-gray-400 rounded-md bg-gray-300 hover:bg-gray-400">
              &rarr;
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
