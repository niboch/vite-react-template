// https://photos.app.goo.gl/eMXpnyrU5iZ5WKxm6
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ImagesGallery() {
  
  async function getList(): Promise<void> {
    await fetch("/api/images")
      .then((res) => res.json() as Promise<{ src: string; thb: string }[]>)
      .then((data) => setImages(data));
  }

  const [images, setImages] = React.useState<{ src: string; thb: string }[]>([]);

  React.useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <ImageGallery
        items={images.map((img) => ({
          original: img.src,
          thumbnail: img.thb || img.src // fallback to original if thumbnail missing
        }))}
      />
    </div>
  );
}