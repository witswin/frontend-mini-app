import { useContext } from "react";
import { EnrolledModalState } from "./context";

export const useEnrolledModalProps = () => useContext(EnrolledModalState);
