// Copy and pasted from here: (types removed to not require a whole bunch of extra dependencies)
// https://github.com/payloadcms/public-demo/blob/master/src/payload/utilities/lexical/lexicalToReact/index.tsx
import escapeHTML from 'escape-html';
import React, { Fragment, JSX } from 'react';
import {
    IS_BOLD,
    IS_CODE,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    IS_SUBSCRIPT,
    IS_SUPERSCRIPT,
    IS_UNDERLINE,
} from './nodeFormat';

interface Props {
    nodes: any[];
}

export function serializeLexical({ nodes }: Props): JSX.Element {
    return (
        <Fragment>
            {nodes?.map((_node, index): JSX.Element | null => {
                if (_node.type === 'text') {
                    const node = _node;
                    let text = (
                        <span
                            dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
                            key={index}
                        />
                    );
                    if (node.format & IS_BOLD) {
                        text = <strong key={index}>{text}</strong>;
                    }
                    if (node.format & IS_ITALIC) {
                        text = <em key={index}>{text}</em>;
                    }
                    if (node.format & IS_STRIKETHROUGH) {
                        text = (
                            <span className="line-through" key={index}>
                                {text}
                            </span>
                        );
                    }
                    if (node.format & IS_UNDERLINE) {
                        text = (
                            <span className="underline" key={index}>
                                {text}
                            </span>
                        );
                    }
                    if (node.format & IS_CODE) {
                        text = <code key={index}>{text}</code>;
                    }
                    if (node.format & IS_SUBSCRIPT) {
                        text = <sub key={index}>{text}</sub>;
                    }
                    if (node.format & IS_SUPERSCRIPT) {
                        text = <sup key={index}>{text}</sup>;
                    }

                    return text;
                }

                if (_node == null) {
                    return null;
                }

                // NOTE: Hacky fix for
                // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
                // which does not return checked: false (only true - i.e. there is no prop for false)
                const serializedChildrenFn = (node: any): JSX.Element | null => {
                    if (node.children == null) {
                        return null;
                    } else {
                        if (node?.type === 'list' && node?.listType === 'check') {
                            for (const item of node.children) {
                                if ('checked' in item) {
                                    if (!item?.checked) {
                                        item.checked = false;
                                    }
                                }
                            }
                            return serializeLexical({ nodes: node.children });
                        } else {
                            return serializeLexical({ nodes: node.children });
                        }
                    }
                };

                const serializedChildren = 'children' in _node ? serializedChildrenFn(_node) : '';

                switch (_node.type) {
                    case 'linebreak': {
                        return <br key={index} />;
                    }
                    case 'paragraph': {
                        return <p key={index}>{serializedChildren}</p>;
                    }
                    case 'heading': {
                        const node = _node;

                        type Heading = Extract<
                            keyof JSX.IntrinsicElements,
                            'h1' | 'h2' | 'h3' | 'h4' | 'h5'
                        >;
                        const Tag = node?.tag as Heading;
                        return <Tag key={index}>{serializedChildren}</Tag>;
                    }
                    case 'list': {
                        const node = _node;

                        type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>;
                        const Tag = node?.tag as List;
                        return (
                            <Tag className={node?.listType} key={index}>
                                {serializedChildren}
                            </Tag>
                        );
                    }
                    case 'listitem': {
                        const node = _node;

                        if (node?.checked != null) {
                            return (
                                <li
                                    aria-checked={node.checked ? 'true' : 'false'}
                                    className={`component--list-item-checkbox ${
                                        node.checked
                                            ? 'component--list-item-checkbox-checked'
                                            : 'component--list-item-checked-unchecked'
                                    }`}
                                    key={index}
                                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                    role="checkbox"
                                    tabIndex={-1}
                                    value={node?.value}
                                >
                                    {serializedChildren}
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} value={node?.value}>
                                    {serializedChildren}
                                </li>
                            );
                        }
                    }
                    case 'quote': {
                        const node = _node;

                        return <blockquote key={index}>{serializedChildren}</blockquote>;
                    }
                    case 'link': {
                        const node = _node;

                        const fields = node.fields;

                        if (fields.linkType === 'custom') {
                            const rel = fields.newTab ? 'noopener noreferrer' : undefined;

                            return (
                                <a
                                    href={fields.url}
                                    key={index}
                                    rel={rel}
                                    target={fields.newTab ? '_blank' : undefined}
                                >
                                    {serializedChildren}
                                </a>
                            );
                        } else {
                            return <span key={index}>Internal link coming soon</span>;
                        }
                    }

                    default:
                        return null;
                }
            })}
        </Fragment>
    );
}
