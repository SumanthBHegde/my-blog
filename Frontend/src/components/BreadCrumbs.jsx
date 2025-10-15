import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

const BreadCrumbs = ({ data }) => {
  return (
    <nav
      className="flex items-center py-3 px-4 overflow-x-auto whitespace-nowrap bg-gradient-to-r from-forest-50 to-white rounded-lg border border-forest-100 shadow-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {data.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && <FiHome className="w-4 h-4 mr-2 text-forest-600" />}
            {index === data.length - 1 ? (
              <span className="text-sm font-semibold text-forest-800 md:text-base">
                {item.name}
              </span>
            ) : (
              <>
                <Link
                  to={item.link}
                  className="text-sm font-medium text-forest-600 hover:text-forest-800 transition-colors duration-200 md:text-base hover:underline"
                >
                  {item.name}
                </Link>
                <FiChevronRight className="w-4 h-4 mx-2 text-forest-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
