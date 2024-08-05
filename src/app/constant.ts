export const INVALID_TOKEN: string = "Invalid Token!";
export const HOME_ROUTE: string = "/";
export const LOGIN_ROUTE: string = "/login";

export const BOOKS_ROUTE: string = "/books";
export const BOOKS_ADD_ROUTE: string = "/books/add";
export const BOOKS_EDIT_ROUTE: string = "/books/edit";
export const BOOKS_VIEW_ROUTE: string = "/books/view";

export const MEMBERS_ROUTE: string = "/members";
export const MEMBERS_ADD_ROUTE: string = "/members/add";
export const MEMBERS_UPDATE_ROUTE: string = "/members/update";
export const MEMBERS_VIEW_ROUTE: string = "/members/view";

export const REQUESTS_ROUTE: string = "/requests";

interface GenreColorMap {
  [genre: string]: string;
}

export const genreColorMap: GenreColorMap = {
  Algorithm: "#FF0000", // Red
  "Data Structures": "#00FF00", // Green
  "Programming Languages": "#0000FF", // Blue
  "Operating Systems": "#FFA500", // Orange
  "Computer Architecture": "#FFD700", // Gold
  "Database Systems": "#008080", // Teal
  "Software Engineering": "#800080", // Purple
  "Artificial Intelligence": "#808000", // Olive
  "Machine Learning": "#008080", // Teal
  "Data Science": "#FF00FF", // Magenta
  Networking: "#FF8000", // Orange
  "Web Development": "#80FF80", // Lime Green
  Cybersecurity: "#00FFFF", // Aqua
  "Cloud Computing": "#FF8080", // Pink
  "Software Testing": "#A020F0", // Purple (different shade)
  "Game Development": "#FFFF00", // Gold
  "Mobile Development": "#800080", // Purple
  DevOps: "#808000", // Teal
  "Information Security": "#FF00FF", // Magenta
  "Human-Computer Interaction": "#FF8080", // Pink
};
