import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useAnimationStore = create(
  subscribeWithSelector((set) => {
    return {
      /************* */
      centerSquareGroupRotation: [0, 0, 0],

      /**
       *
       * SETTERS
       *
       */
      // storeQuats: (nextQuat) => {
      //   set((state) => {
      //     if (
      //       //check all props just in case its a new object with old props
      //       (state.newQuat.w !== nextQuat.w) |
      //       (state.newQuat.x !== nextQuat.x) |
      //       (state.newQuat.y !== nextQuat.y) |
      //       (state.newQuat.z !== nextQuat.z)
      //     ) {
      //       return { newQuat: nextQuat, oldQuat: state.newQuat };
      //     }
      //     return {};
      //   });
      // },

      /***************** */
    };
  })
);

export default useAnimationStore;
