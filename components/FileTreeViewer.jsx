'use client';
import { useState } from 'react';

// Utility: Build tree from flat paths
function buildFileTree(files) {
    const root = {};
    Object.keys(files).forEach((fullPath) => {
        const parts = fullPath.split('/');
        let cur = root;
        parts.forEach((part, idx) => {
            if (!cur[part]) {
                cur[part] = { __children: {}, __isFile: idx === parts.length - 1 };
            }
            cur = cur[part].__children;
        });
    });

    function traverse(obj, prefix = '') {
        return Object.entries(obj).map(([name, val]) => {
            const fullPath = prefix ? `${prefix}/${name}` : name;
            const node = {
                name,
                path: fullPath,
                isFile: val.__isFile,
            };
            if (!val.__isFile) {
                node.children = traverse(val.__children, fullPath);
            }
            return node;
        });
    }
    return traverse(root);
}

export default function FileTreeViewer({ files, selectedFile, onSelectFile }) {
    const tree = buildFileTree(files);

    return (
        <div className="p-2">
            {tree.map((node) => (
                <TreeNode
                    key={node.path}
                    node={node}
                    selectedFile={selectedFile}
                    onSelectFile={onSelectFile}
                    level={0}
                />
            ))}
        </div>
    );
}

function TreeNode({ node, selectedFile, onSelectFile, level }) {
    const [open, setOpen] = useState(level === 0); // Auto-expand first level
    const indent = level * 16;

    if (node.isFile) {
        const isSelected = selectedFile === node.path;
        return (
            <div
                onClick={() => onSelectFile(node.path)}
                className={`cursor-pointer px-2 py-1 text-sm font-mono truncate ${isSelected ? 'bg-blue-100 font-medium' : 'hover:bg-gray-100'
                    }`}
                style={{ paddingLeft: indent + 8 }}
                title={node.path}
            >
                📄 {node.name}
            </div>
        );
    }

    return (
        <div>
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer px-2 py-1 text-sm font-mono font-bold hover:bg-gray-100 flex items-center"
                style={{ paddingLeft: indent }}
            >
                <span className="mr-1">{open ? '📂' : '📁'}</span>
                <span className="truncate">{node.name}</span>
            </div>
            {open && node.children && node.children.map((child) => (
                <TreeNode
                    key={child.path}
                    node={child}
                    selectedFile={selectedFile}
                    onSelectFile={onSelectFile}
                    level={level + 1}
                />
            ))}
        </div>
    );
}