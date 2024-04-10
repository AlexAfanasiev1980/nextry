import { Modal } from "@/components/modal/Modal";
import ErrorPage from "@/components/pages/errorPage/ErrorPage";

export const runtime = "edge";

export default function Page() {
  return (
    <Modal>
      <ErrorPage />
    </Modal>
  );
}
