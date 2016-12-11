export default function calculateMidpoint(entity) {
    return {
        left: entity.position.left + (entity.size.width / 2),
        top: entity.position.top + (entity.size.height / 2),
    };
}
