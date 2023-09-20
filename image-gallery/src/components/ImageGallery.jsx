import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import imageData from './imageData';
import ImageCard from './ImageCard'; // Import the ImageCard component

const ImageGallery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredImages, setFilteredImages] = useState(imageData);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        const filtered = imageData.filter((image) => {
            return image.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
        });

        setFilteredImages(filtered);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredImages(imageData);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(filteredImages);
        const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, reorderedImage);

        setFilteredImages(reorderedImages);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by tag..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
                <button onClick={handleClearSearch}>Clear</button>
            </div>
            <div className="gallery">
                <Droppable droppableId="image-gallery">
                    {(provided) => (
                        <div
                            className="gallery-items"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {filteredImages.map((image, index) => (
                                <ImageCard key={image.id} image={image} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default ImageGallery;
