export const uniq = (arr: Array<any>) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i]);
        }
    }
    return result
}

export const formatDate = (date : string) => {
    const createdAt = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.ceil(
        (today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000)
    );
    const hours =
        createdAt.getHours() > 9
            ? createdAt.getHours()
            : `0${createdAt.getHours()}`;
    const min =
        createdAt.getMinutes() > 9
            ? createdAt.getMinutes()
            : `0${createdAt.getMinutes()}`;
    const getDays = (days : number) =>
        days === 0
            ? "Сегодня"
            : days === 1
                ? "Вчера"
                : days > 1
                    ? `${days} дня(-ей) назад`
                    : "Ошибка";
    return `${getDays(diffTime)}, ${hours}:${min}`;
};