import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import { TextureLoader, LoadingManager } from "three";
import { FaBullseye, FaBolt, FaUsers } from "react-icons/fa";

// Earth Component with rotation
function Earth({ onLoaded }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const manager = new LoadingManager();
    manager.onLoad = () => onLoaded();

    new TextureLoader(manager).load(
      "https://i.ibb.co/GfwyyKpn/8k-earth-daymap.jpg",
      (tex) => setTexture(tex)
    );
  }, [onLoaded]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} metalness={0.4} roughness={0.3} />
    </mesh>
  );
}

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e8f0ff] to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Loading screen */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-80">
          <p className="text-blue-500 text-xl animate-pulse">Loading Earth...</p>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Earth onLoaded={() => setIsLoading(false)} />
            <Stars />
            <Preload all />
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-center text-[#347DFA] dark:text-blue-400 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Discover SkillGain 📡
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          SkillGain is your launchpad to knowledge. Whether you're mastering a
          course or diving into a book, we bring learning to life with
          beautifully designed tools, intuitive access, and a thriving
          community. Learn smarter. Grow faster.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl text-[#347DFA] dark:text-blue-400 mb-3">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#347DFA] dark:text-blue-400 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Features List
const features = [
  {
    title: "Curated with Purpose",
    description:
      "Skip the noise. Get tailored content that aligns with your personal learning journey.",
    icon: <FaBullseye />,
  },
  {
    title: "Effortless Learning",
    description:
      "One platform. All devices. Enjoy a frictionless experience across books and courses.",
    icon: <FaBolt />,
  },
  {
    title: "Community-First",
    description:
      "Engage with learners worldwide. Share insights, reviews, and grow together.",
    icon: <FaUsers />,
  },
];
