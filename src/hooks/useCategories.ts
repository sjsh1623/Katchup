import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
    code: string;
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = () => {
        setLoading(true);
        axios
            .get<Category[]>('https://api.katchup.io/v1/categories')
            .then((res) => setCategories(res.data))
            .catch((err) => {
                console.error('카테고리 불러오기 실패:', err);
                setError(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refetch: fetchCategories };
}