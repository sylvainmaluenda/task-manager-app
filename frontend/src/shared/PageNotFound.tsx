const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">
        Oups ! La page que vous cherchez n'existe pas.
      </p>

      <a
        href="/"
        className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium shadow-md hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </a>
    </div>
  );
};

export default NotFound;
