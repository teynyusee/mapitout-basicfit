import { HOME_CARDS } from "../../../data/homeCards";
import { CardItem } from "./CardItem";
import type { ZoneId } from "../../../data/zones";

type Props = {
  activeZone: ZoneId;
  onSelectZone: (zone: ZoneId) => void;
};

export function Cards({ activeZone, onSelectZone }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 50,
        justifyContent: "center",
      }}
    >
      {HOME_CARDS.map((card) => (
        <CardItem
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          active={card.id === activeZone}
          onClick={() => onSelectZone(card.id)}
        />
      ))}
    </div>
  );
}
