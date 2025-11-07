import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, onSearch, searchTerm }) => {
    const formatCategoryName = (category) => {
        return category
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Recherche */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Filtres par catégorie */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onCategoryChange('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${selectedCategory === 'all'
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Tous
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${selectedCategory === category
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {formatCategoryName(category)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;