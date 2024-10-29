export function hexToRgba(hex: string, alpha = 1): string {
    // Remove o símbolo "#" se estiver presente
    hex = hex.replace('#', '');

    // Expande a cor se ela estiver em formato curto (por exemplo, "#FFF" para "#FFFFFF")
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Converte o hex para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Retorna a string no formato RGBA
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}