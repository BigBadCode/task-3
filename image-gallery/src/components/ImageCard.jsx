import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ImageCard = ({ image, index }) => {
    return (
        <Draggable draggableId={image.id.toString()} index={index}>
            {(provided) => (
                <div
                    className="gallery-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img src={image.url} alt={image.alt_description} />
                    <div className="tags">
                        {image.tags.map((tag) => (
                            <span key={tag} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default ImageCard;
