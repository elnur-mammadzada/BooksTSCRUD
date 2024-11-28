import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book, BooksState, Category } from "../types/types";

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  isSnackbarOpen: false,
  snackbarMessage: "",
  bookById: {
    id: 0,
    title: "",
    author: "",
    description: "",
    categoryName: "",
    categoryId: "",
  },
  selectedId: 0,
};

export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<Book[]>("http://localhost:3004/books ");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const addBook = createAsyncThunk(
  "addBook",
  async (newBook: Book, thunkApi) => {
    try {
      const response = await axios.post<Book>(
        "http://localhost:3004/books",
        newBook
      );
      thunkApi.dispatch(fetchBooks());
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<Category[]>(
        " http://localhost:3004/categories"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const fetchCategoriesById = createAsyncThunk(
  "fetchCategoriesById",
  async (categoryId: number, thunkApi) => {
    try {
      const response = await axios.get<Book[]>(
        `http://localhost:3004/books?categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);
export const getById = createAsyncThunk<Book, number | undefined>(
  "bookById",
  async (id, thunkApi) => {
    try {
      const response = await axios.get<Book>(
        `http://localhost:3004/books/${id}`
      );
      thunkApi.dispatch(fetchBooks());

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const deleteBooks = createAsyncThunk(
  "deleteBooks",
  async (id: number | undefined, thunkApi) => {
    try {
      await axios.delete(`http://localhost:3004/books/${id} `);
      thunkApi.dispatch(fetchBooks());

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const updateBooks = createAsyncThunk(
  "updateBooks",
  async (updatedBooks: Book, thunkApi) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/books/${updatedBooks.id}`,
        updatedBooks
      );
      thunkApi.dispatch(fetchBooks());
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    closeSnackbar: (state) => {
      state.isSnackbarOpen = false;
      state.snackbarMessage = "";
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xəta baş verdi";
      });
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xəta baş verdi";
      });
    builder
      .addCase(fetchCategoriesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchCategoriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xəta baş verdi";
      });

    builder
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Kitab silindi:  ${action.payload}`;
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.error = String(action.payload);
      });

    // GETBYID
    builder
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.bookById = action.payload;
      })

      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });

    // UPDATE
    builder
      .addCase(updateBooks.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Düzəliş olundu: ${action.payload.categoryName}`;
      })

      .addCase(updateBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
    // ADD

    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Kitab yaradıldı:  ${action.payload.categoryName}`;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export default booksSlice.reducer;
export const { closeSnackbar, setSelectedId } = booksSlice.actions;
