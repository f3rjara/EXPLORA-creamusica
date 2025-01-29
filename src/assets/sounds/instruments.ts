const NotesNames = {
  0: 'si.wav',
  1: 'la_s.wav',
  2: 'la.wav',
  3: 'sol_s.wav',
  4: 'sol.wav',
  5: 'fa_s.wav',
  6: 'fa.wav',
  7: 'mi.wav',
  8: 're_s.wav',
  9: 're.wav',
  10: 'do_s.wav',
  11: 'do.wav',
};

const NotesBaseNames = {
  0: 'base.wav',
  1: 'base.wav',
  2: 'base.wav',
  3: 'base.wav',
  4: 'base.wav',
  5: 'base.wav',
  6: 'base.wav',
  7: 'base.wav',
  8: 'base.wav',
  9: 'base.wav',
  10: 'base.wav',
  11: 'base.wav',
};

export const instrumentsData = [
  {
    instrument: 'kalimba',
    files: NotesNames,
    path: 'kalimba/',
  },
  {
    instrument: 'contrabajo',
    files: NotesNames,
    path: 'contrabajo/',
  },
  {
    instrument: 'maraca',
    files: NotesBaseNames,
    path: 'maraca/',
  },
  {
    instrument: 'hithat',
    files: NotesBaseNames,
    path: 'hithat/',
  },
  {
    instrument: 'pad_sonajero',
    files: NotesBaseNames,
    path: 'pad_sonajero/',
  },
  {
    instrument: 'conga',
    files: NotesBaseNames,
    path: 'conga/',
  },
  {
    instrument: 'bombo',
    files: NotesBaseNames,
    path: 'bombo/',
  },
  {
    instrument: 'sintetizador_alto',
    files: NotesNames,
    path: 'sintetizador_alto/',
  },
  {
    instrument: 'sintetizador_bajo',
    files: NotesNames,
    path: 'sintetizador_bajo/',
  },
  {
    instrument: 'piano_rhodes',
    files: NotesNames,
    path: 'piano_rhodes/',
  },
  {
    instrument: 'voz',
    files: NotesNames,
    path: 'voz/',
  },
];
