export type RiotTftMatch = {
  metadata: {
    match_id: string;
    participants: string[];
  };
  info: {
    game_datetime: number;
    game_version: string;
    queue_id?: number;
    participants: RiotTftParticipant[];
  };
};

export type RiotTftParticipant = {
  placement: number;
  puuid: string;
  traits: RiotTftTrait[];
  units: RiotTftUnit[];
};

export type RiotTftTrait = {
  name: string;
  num_units: number;
  tier_current: number;
  tier_total: number;
  style: number;
};

export type RiotTftUnit = {
  character_id: string;
  itemNames: string[];
  rarity: number;
  tier: number;
};