export interface APIResponse {
    contentlets: Contentlet[];
}

export interface Contentlet {
    publishDate:         Date;
    postingDate:         string;
    inode:               string;
    host:                string;
    variantId:           string;
    locked:              boolean;
    stInode:             string;
    contentType:         string;
    identifier:          string;
    image:               string;
    urlTitle:            string;
    tags:                string;
    folder:              string;
    hasTitleImage:       boolean;
    sortOrder:           number;
    hostName:            string;
    modDate:             Date;
    imageMetaData:       ImageMetaData;
    blogContent:         DocContent | string;
    title:               string;
    baseType:            string;
    archived:            boolean;
    working:             boolean;
    live:                boolean;
    owner:               string;
    imageVersion:        string;
    imageContentAsset:   string;
    languageId:          number;
    URL_MAP_FOR_CONTENT: string;
    url:                 string;
    titleImage:          string;
    modUserName:         string;
    urlMap:              string;
    hasLiveVersion:      boolean;
    modUser:             string;
    teaser:              string;
    __icon__:            string;
    contentTypeIcon:     string;
    author:              string[];
    blogComment:         string[];
}

export interface DocContent {
    type:    string;
    attrs?:   DocContentAttrs;
    content: BlogContent;
}

export interface DocContentAttrs {
    chartCount:  number;
    wordCount:   number;
    readingTime: number;
}

export type BlogContent = HeadingContent[] | OtherContent[] | FinalContent[] | ImageContent[];

export interface HeadingContent {
    type:   'heading';
    attrs:  {
        level: number,
        [key: string]: any
    };
    content: BlogContent
}

export interface ImageContent {
    type:   'dotImage';
    attrs:  {
        data:{
            asset: string;
            [key: string]: any;
        }
        [key: string]: any;
    };
}

export interface OtherContent {
    type:    'bulletList' | 'listItem' | 'paragraph';
    attrs?:  {[key: string]: any};
    content:  BlogContent;
}

export interface FinalContent {
    type: 'text';
    marks?: {[key: string]: any}[];
    text: string;
}

export interface ImageMetaData {
    modDate:     number;
    sha256:      string;
    length:      number;
    title:       string;
    version:     number;
    isImage:     boolean;
    fileSize:    number;
    name:        string;
    width:       number;
    contentType: string;
    height:      number;
}
