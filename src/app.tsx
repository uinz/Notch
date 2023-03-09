import "./app.css";
import { useRef, useState, useEffect } from "react";
import { tw } from "typewind";
import frame from "~/assets/mac-16-frame.png";

declare function showOpenFilePicker(options?: {
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
  types: { description?: string; accept: Record<string, string[]> }[];
}): Promise<{ getFile(): Promise<File> }[]>;

export const App: React.FC = () => {
  const [img, setImage] = useState<HTMLImageElement>();

  const handleClick = async () => {
    const [res] = await showOpenFilePicker({
      multiple: false,
      types: [
        {
          accept: {
            "images/*": [".png", ".jpg", ".jpeg"],
          },
        },
      ],
    });

    const img = new Image();
    img.addEventListener(
      "load",
      () => {
        setImage(img);
      },
      { once: true }
    );

    const file = await res.getFile();
    const src = URL.createObjectURL(file);
    img.setAttribute("src", src);
  };

  return (
    <div
      onClick={handleClick}
      className={tw.w_screen.h_screen.flex.items_center.justify_center}
    >
      <Preview img={img} />
    </div>
  );
};

const WIDTH = 3456;
const HEIGHT = 2234;
const BAR_HEIGHT = 66;

export const Preview: React.FC<{ img?: HTMLImageElement }> = ({ img }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const $canvas = ref.current!;
    const context = $canvas.getContext("2d")!;

    if (img) {
      context.drawImage(img, 0, 0, WIDTH, HEIGHT);
    }

    const gradient = context.createLinearGradient(0, BAR_HEIGHT, WIDTH, 0);
    gradient.addColorStop(0, "#0000");
    gradient.addColorStop(0.5, "#000");
    gradient.addColorStop(1, "#0000");
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, BAR_HEIGHT);

    return () => {
      context.clearRect(0, 0, 4608, 2675);
    };
  }, [img]);

  return (
    <div className={tw.relative} style={{ width: 1024, flexShrink: 0 }}>
      <canvas
        ref={ref}
        className={tw.absolute}
        style={{
          width: `${(100 * 806) / 1024}%`,
          top: `${(100 * 12) / 1024}%`,
          left: `${(100 * 109) / 1024}%`,
        }}
        width={WIDTH}
        height={HEIGHT}
      />
      <img
        className={tw.pointer_events_none.block.relative.z_10.w_full}
        src={frame}
      />
    </div>
  );
};
