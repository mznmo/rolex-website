import { JSX } from "react";
import { Navigate } from "react-router-dom";

type ProtectedComponentsProps = {
  element: JSX.Element;
};

export default function ProtectedComponents({
  element,
}: ProtectedComponentsProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
}
