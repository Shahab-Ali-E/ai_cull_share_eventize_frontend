"use client";

// loading.tsx
export default function SquareLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-card">
      <style jsx>{`
        .spinner {
          width: 70.4px;
          height: 70.4px;
          --clr: rgb(128, 55, 209);
          --clr-alpha: rgb(128, 55, 209, 0.1);
          animation: spinner 1.6s infinite ease;
          transform-style: preserve-3d;
        }

        .spinner > div {
          background-color: var(--clr-alpha);
          height: 100%;
          position: absolute;
          width: 100%;
          border: 3.5px solid var(--clr);
        }

        .spinner div:nth-of-type(1) {
          transform: translateZ(-35.2px) rotateY(180deg);
        }

        .spinner div:nth-of-type(2) {
          transform: rotateY(-270deg) translateX(50%);
          transform-origin: top right;
        }

        .spinner div:nth-of-type(3) {
          transform: rotateY(270deg) translateX(-50%);
          transform-origin: center left;
        }

        .spinner div:nth-of-type(4) {
          transform: rotateX(90deg) translateY(-50%);
          transform-origin: top center;
        }

        .spinner div:nth-of-type(5) {
          transform: rotateX(-90deg) translateY(50%);
          transform-origin: bottom center;
        }

        .spinner div:nth-of-type(6) {
          transform: translateZ(35.2px);
        }

        @keyframes spinner {
          0% {
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
          }

          50% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
          }

          100% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
          }
        }
      `}</style>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
