export const professorTerms = (course, professor) => {
  switch (course) {
    case 'COSC 001':
      switch (professor) {
        case 'Hany Farid':
          return ['15F', '16F'];
        case 'Devin Balkcom':
          return ['16S', '17W', '18W'];
        case 'Thomas H. Cormen':
          return ['16W', '17S', '18F'];
        case 'Prasad Jayanti':
          return ['17F'];
        case 'all':
          return ['15F', '16W', '16S', '16F', '17W', '17S', '17F', '18W', '18F'];
        default:
          return [];
      }
    case 'COSC 010':
      switch (professor) {
        case 'Robert L. Drysdale III':
          return ['16W'];
        case 'Micahel A. Casey':
          return ['17S'];
        case 'Chistopher J. Bailey-Kellogg':
          return ['16S', '16F', '17F'];
        case 'Prasad Jayanti':
          return ['15F'];
        case 'all':
          return ['15F', '16W', '16S', '16F', '17S', '17F'];
        default:
          return [];
      }
    case 'COSC 030':
      switch (professor) {
        case 'Amit Chakrabarti':
          return ['15F', '17W', '18W'];
        case 'Prasad Jayanti':
          return ['16W', '16F', '17X', '18F'];
        case 'Deeparnab Chakrabarty':
          return ['19W'];
        case 'all':
          return ['15F', '16W', '16F', '17W', '17X', '18W', '18F', '19W'];
        default:
          return [];
      }
    case 'COSC 031':
      switch (professor) {
        case 'Thomas H. Cormen':
          return ['16S', '16F', '19W'];
        case 'Prasad Jayanti':
          return ['17W'];
        case 'Amit Chakrabarti':
          return ['17S'];
        case 'Deeparnab Chakrabarty':
          return ['18W', '18S'];
        case 'all':
          return ['16S', '16F', '17W', '17S', '18W', '18S', '19W'];
        default:
          return [];
      }
    default:
      return [];
  }
};

export const courseProfessors = (course) => {
  switch (course) {
    case 'COSC 001':
      return ['Devin Balkcom', 'Thomas H. Cormen', 'Hany Farid', 'Prasad Jayanti'];
    case 'COSC 010':
      return ['Chistopher J. Bailey-Kellogg', 'Micahel A. Casey', 'Robert L. Drysdale III', 'Prasad Jayanti'];
    case 'COSC 030':
      return ['Amit Chakrabarti', 'Deeparnab Chakrabarty', 'Prasad Jayanti'];
    case 'COSC 031':
      return ['Amit Chakrabarti', 'Deeparnab Chakrabarty', 'Thomas H. Cormen', 'Prasad Jayanti'];
    default:
      return [];
  }
};
