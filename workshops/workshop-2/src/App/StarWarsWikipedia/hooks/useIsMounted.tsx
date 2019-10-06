import { useRef, useEffect } from "react";

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      // Cannot use state to track isMounted when component will unmount
      // Update state will not rerender
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
