export interface SearchResult {
  id: string;
  title: string;
  address: string;
  timestamp: string;
  snippet: string;
  image_src: string;
  // highlight: string;
};

export interface searchProps {
  setResult: Function
}

export interface resultProps {
  result : Array<SearchResult>
}