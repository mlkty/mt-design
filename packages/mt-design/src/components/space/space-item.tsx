interface SpaceItemProps {
  children?: React.ReactNode;
}

function SpaceItem(props: SpaceItemProps) {
  return <div className="mt-space-item">{props.children}</div>;
}

export { SpaceItem };
