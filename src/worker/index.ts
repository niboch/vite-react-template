import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Yoshi" }));

app.get("/api/images", async (c) => {
  const images = await getAlbum();
  return c.json(images);
});

async function getAlbum(): Promise<{ src: string; thb: string }[]> {
    return [
        { src: "/imgs/2014 Europe 900.JPG", thb: "/imgs/thumbnails/2014 Europe 900.JPG" },
        { src: "/imgs/DSC_0474.JPG", thb: "/imgs/thumbnails/DSC_0474.JPG" },
        { src: "/imgs/IMG_0897.JPG", thb: "/imgs/thumbnails/IMG_0897.JPG" },
        { src: "/imgs/IMG_1057.JPG", thb: "/imgs/thumbnails/IMG_1057.JPG" },
        { src: "/imgs/IMG_20140509_114043.jpg", thb: "/imgs/thumbnails/IMG_20140509_114043.jpg" },
        { src: "/imgs/IMG_20140716_134109.jpg", thb: "/imgs/thumbnails/IMG_20140716_134109.jpg" }
    ];
}
export default app;