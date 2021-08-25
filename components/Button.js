export default function Button({label, onClick}) {
  return (
    <div className="shadow py-2 px-4 bg-blue-50 hover:bg-blue-100 cursor-pointer" onClick={onClick}>
      {label}
    </div>
  );
};
