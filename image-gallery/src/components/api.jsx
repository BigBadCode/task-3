const UNSPLASH_API_KEY = 'yyHh2ue3N-NE5jCwpQmCh7NejE89t5_f7-_A9zGx3FA';

export const fetchRandomImagesWithTags = async (count) => {
    try {
        const url = `https://api.unsplash.com/photos/random/?count=${count}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch random images from Unsplash');
        }

        const data = await response.json();

        const tagsPromises = data.map(async (image) => {
            const tagsUrl = `https://api.unsplash.com/photos/${image.id}/tags`;
            const tagsResponse = await fetch(tagsUrl, {
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
                },
            });

            if (!tagsResponse.ok) {
                throw new Error('Failed to fetch tags for an image from Unsplash');
            }

            const tagsData = await tagsResponse.json();
            return tagsData.map((tag) => tag.title);
        });

        const tags = await Promise.all(tagsPromises);

        const imagesWithTags = data.map((image, index) => ({
            id: image.id,
            url: image.urls.small,
            alt_description: image.alt_description,
            tags: tags[index],
        }));

        return imagesWithTags;
    } catch (error) {
        console.error('Error fetching random images with tags from Unsplash:', error);
        throw error;
    }
};
