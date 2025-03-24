import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">мне лень дописывать потом чтото добавлю</p>
        <p className="text-sm text-gray-500 mb-6">Создано Проектом akproject</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          вернись да на главную страницу дик ма вий из
        </a>
      </div>
    </div>
  );
};

export default NotFound;
