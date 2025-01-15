export interface Walkable {
    can_walk_on(): boolean;
    enableWalk(): void;
    disableWalk(): void;
}