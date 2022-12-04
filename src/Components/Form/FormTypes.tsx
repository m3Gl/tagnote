

export type FormTypes = {
    addNote: (event: React.FormEvent<HTMLFormElement>, noteData: { title: string, content: string, tags: string[] }) => void,
    addSearchValue: (value: string) => void
  }