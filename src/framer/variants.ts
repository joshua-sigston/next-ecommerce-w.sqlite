export const menuSlide = {
  initial: {
    y: '-100%'
  },
  animate: {
    y: '0%',
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1]
    }
  },
  exit: {
    y: '100%',
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1]
    }
  }
}

export const linkSlide = {
  initial: {
    y: '-80px'
  },
  animate: (i: number) => ({
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1], delay: .5 * i
    }
  }),
  exit: (i: number) => ({
    y: '80px',
    transition: {
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1],
    }
  })
}