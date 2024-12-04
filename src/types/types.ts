import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  categoryName: string;
  categoryId: string;
}

export interface BookListProps {
  books: Book[];
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  categories?: Category[];
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  bookById: Book;
  selectedId: number;
}

export interface BookCardProps {
  title: string;
  author: string;
  description: string;
  category?: string;
  categoryName: string;
  handleDelete: () => void;
  handleEditClick: () => void;
}

export interface MUISelectProps {
  handleChange: (event: SelectChangeEvent) => void;
  selectedValue: string;
  children: ReactNode;
  label: string;
  name?: string;
}

export interface Category {
  id: number;
  name?: string;
}

export interface MUIDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  accept?: string;
  decline?: string;
  onSubmit?: () => void;
  onDelete?: () => void;
  remove?: string;
}

export interface MUITextFieldProps {
  name: string;
  control: any;
  placeholder: string;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  error?: boolean;
  type?: string
}

export interface UpdatePageProps {
  handleClose: () => void;
  open: boolean;
  selectedBook: Book;
  label: string;
}

export interface AddPageProps {
  handleClose: () => void;
  open: boolean;
}

export interface User {
  username: string;
  password: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: null;
  isAuth: boolean;
}
