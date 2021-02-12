import React from 'react';
import { TComponent } from '@components/types';
import { AnimatePresence, motion, Transition } from 'framer-motion';

const spring: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
};

interface Props extends TComponent {
  children: React.ReactNode;
}

const Mount = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <div>
        <motion.div
          transition={spring}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="page-transition"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Mount;
