import { serializeLexical } from './serializeLexical';

interface Props {
    content: null | undefined | { root: { children: any[] } };
}

export const LexicalRenderer = ({ content }: Props) => {
    return <>{serializeLexical({ nodes: content?.root.children ?? [] })}</>;
};
