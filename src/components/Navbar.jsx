const Navbar = () => {
  return (
    <div className="bg-white text-black shadow-md p-5 flex justify-between top-0 sticky z-10">
      <h1 className="font-bold text-xl">QR Code Generator</h1>
      <button className="bg-black text-white px-6 py-2 rounded-sm uppercase hover:shadow-md hover:-translate-y-1 active:translate-y-0">
        Sign in
      </button>
    </div>
  );
};

export default Navbar;
