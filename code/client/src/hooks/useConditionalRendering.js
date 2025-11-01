import { useSelector } from "react-redux";
function useConditionalRendering() {
  const success = useSelector((state) => state.users?.user?.data);
  const status = useSelector((state) => state.users?.status);
  const error = useSelector((state) => state.users?.error);
  const user = useSelector((state) => state.users.user);
  return { success, status, error, user };
}

export default useConditionalRendering;
