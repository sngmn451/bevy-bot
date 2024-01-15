export interface FetchResponse {
  data: Data
  props: any[]
  envs: any[]
  taxonomies: any[]
}

export interface Data {
  current_page: number
  data: Daum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export interface Daum {
  scientific_name: string
  id: number
  url: string
  meta: Meta
  cover: Cover
}

export interface Meta {
  appearance: string
  title: string
}

export interface Cover {
  image: string
}
