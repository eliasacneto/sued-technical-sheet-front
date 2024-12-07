'use client';

import React, { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/connect/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { informationError } from '@/components/informationError';


interface Recipe {
    id: number;
    name: string;
    preparation_method: string;
    required_utensils: string;
    prep_time: number;
    created_by: number;
    servings: number;
    school_id: number;
    total_cost: string;
    created_at: string;
    updated_at: string;
    created_by_name: string;
    school_name: string;
    metrics: {
        cost_per_serving: number;
        total_ingredients: number;
        average_ingredient_cost: number;
    };
    ingredients: RecipeIngredient[];
}

interface RecipeIngredient {
    quantity: string;
    unit_of_measure: string;
    total_cost: number;
    inventory_id: number;
    ingredient_description: string;
    legend_type: string;
    gross_weight: string;
    correction_factor: string;
    cooked_weight: string;
    cooking_index: string;
    kcal: string;
    kj: string;
    protein: string;
    lipids: string;
    carbohydrate: string;
    calcium: string;
    iron: string;
    retinol: string;
    vitaminC: string;
    sodium: string;
    brand: string;
    unit_price: string;
    expiration_date: string;
    cost_per_serving: number;
}

// interface RecipeDetails {
//     recipe_id: number;
//     name: string;
//     servings: number;
//     preparation_method: string;
//     required_utensils: string[];
//     total_cost: number;
//     cost_per_serving: number;
//     ingredients: IngredientDetails[];
// }

// interface IngredientDetails {
//     id: number;
//     description: string;
//     legend_type: string;
//     adjusted_quantity: number;
//     correction_factor: number;
//     cooked_weight: number;
//     cooking_index: number;
//     kcal: number;
//     kj: number;
//     protein: number;
//     lipids: number;
//     carbohydrate: number;
//     calcium: number;
//     iron: number;
//     retinol: number;
//     vitaminC: number;
//     sodium: number;
//     unit_of_measure: string;
//     adjusted_cost: number;
//     brand: string;
//     expiration_date: string;
// }

const RecipeView = () => {
    const params = useParams();
    // const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [servings, setServings] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const recipeId = params.id as string;
        if (recipeId) {
            fetchRecipeDetails(Number(recipeId));
        }
    }, [params.id]);

    const fetchRecipeDetails = async (recipeId: number, servings:number = 1) => {
        setError(null)
        setLoading(true)
        try {
            if (servings > 1) {
                const response = await api.post('/recipes/serving', {
                    recipeId,
                    desiredServings: servings
                });
                setRecipe(response.data.data);
            } else {
                const response = await api.get(`/recipes/${recipeId}`);
                setRecipe(response.data.data);
            }
        } catch (error) {
            informationError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleServingsChange = async (newServings: number) => {
        const recipeId = params.id as string;
        if (recipeId) {
            setServings(newServings);
            await fetchRecipeDetails(Number(recipeId), newServings);
        }
    };

    console.log('recipe: ', recipe);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-start gap-4 md:justify-end mb-4">
                <Link href="/admin/recipes">
                    <Button variant="outline" className="text-orange-500 hover:text-orange-600 font-bold">
                        <ArrowLeft /> Voltar
                    </Button>
                </Link>
                <ToastContainer />
            </div>
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">{recipe?.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="servings" className="font-semibold">Porções:</label>
                    <input
                        id="servings"
                        type="number"
                        min="1"
                        value={servings}
                        onChange={(e) => setServings(Number(e.target.value))}
                        className="w-20 p-2 border rounded"
                    />
                    <Button onClick={handleServingsChange}>Recalcular</Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h2 className="font-semibold">Informações da Receita</h2>
                        <p>Custo Total: R$ {recipe?.total_cost}</p>
                        <p>Custo por Porção: R$ {recipe?.cost_per_serving}</p>
                        <p>Número de Porções: {recipe?.servings}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold">Utensílios Necessários</h2>
                        <ul>
                            {typeof recipe?.required_utensils === 'string'
                                ? [recipe?.required_utensils].map((utensil, index) => (
                                    <li key={index}>{utensil}</li>
                                ))
                                : recipe?.required_utensils?.map((utensil, index) => (
                                    <li key={index}>{utensil}</li>
                                ))
                            }
                        </ul>
                        {/* <ul>
                            {recipe?.required_utensils?.map((utensil, index) => (
                                <li key={index}>{utensil}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-2">Método de Preparo</h2>
                <p className="mb-4">{recipe?.preparation_method}</p>
                <p className="mb-4">{recipe?.prep_time}</p>

                <h2 className="text-xl font-bold mb-2">Ingredientes</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ingrediente</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead>Custo</TableHead>
                            <TableHead>Kcal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recipe?.ingredients?.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                                <TableCell>{ingredient.description}</TableCell>
                                <TableCell>{ingredient?.adjusted_quantity?.toFixed(2)}</TableCell>
                                <TableCell>{ingredient.unit_of_measure}</TableCell>
                                <TableCell>R$ {ingredient?.adjusted_cost?.toFixed(2)}</TableCell>
                                <TableCell>{ingredient.kcal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default RecipeView;

//montar com import MenuViewDialog from "@/components/menuViewDialog";
//dialog para mostrar 
//     "id": 2,
//     "name": "eeee",
//     "preparation_method": "eeee",
//     "required_utensils": "eeee",
//     "prep_time": 0,
//     "created_by": 2,
//     "servings": 1,
//     "school_id": 1,
//     "total_cost": "6666.00",
//     "created_at": "2024-12-06T20:56:03.000Z",
//     "updated_at": "2024-12-06T20:56:03.000Z",
//     "created_by_name": "Cássio Tadeu - State Adm",
//     "school_name": "Escola Municipal POA",
//     "metrics": {
//         "cost_per_serving": 6666,
//         "total_ingredients": 1,
//         "average_ingredient_cost": 6666
//     },
//     "ingredients": [
//         {
//             "quantity": "6666.00",
//             "unit_of_measure": "g",
//             "total_cost": 6666,
//             "inventory_id": 1,
//             "ingredient_description": "Ovo",
//             "legend_type": "Aquisição proibida",
//             "gross_weight": "10000.00",
//             "correction_factor": "125.00",
//             "cooked_weight": "2200.00",
//             "cooking_index": "3300.00",
//             "kcal": "12225.00",
//             "kj": "22200.00",
//             "protein": "10000.00",
//             "lipids": "3300.00",
//             "carbohydrate": "10000.00",
//             "calcium": "1100.00",
//             "iron": "1100.00",
//             "retinol": "10000.00",
//             "vitaminC": "3300.00",
//             "sodium": "10000.00",
//             "brand": "naturovos",
//             "unit_price": "50.00",
//             "expiration_date": "2025-01-02T03:00:00.000Z",
//             "cost_per_serving": 6666
//         }
//     ]
// } 

// e poder imprimir


// codigo ok 
// 'use client';

// import React, { useState, useEffect, use } from 'react';
// import { useParams } from 'next/navigation';
// import { api } from '@/connect/api';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import Link from 'next/link';
// import { ArrowLeft } from 'lucide-react';
// import { ToastContainer } from 'react-toastify';
// import { informationError } from '@/components/informationError';

// interface RecipeDetails {
//     recipe_id: number;
//     name: string;
//     servings: number;
//     preparation_method: string;
//     required_utensils: string[];
//     total_cost: number;
//     cost_per_serving: number;
//     ingredients: IngredientDetails[];
// }

// interface IngredientDetails {
//     id: number;
//     description: string;
//     legend_type: string;
//     adjusted_quantity: number;
//     correction_factor: number;
//     cooked_weight: number;
//     cooking_index: number;
//     kcal: number;
//     kj: number;
//     protein: number;
//     lipids: number;
//     carbohydrate: number;
//     calcium: number;
//     iron: number;
//     retinol: number;
//     vitaminC: number;
//     sodium: number;
//     unit_of_measure: string;
//     adjusted_cost: number;
//     brand: string;
//     expiration_date: string;
// }

// const RecipeView = () => {
//     const params = useParams();
//     const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
//     const [servings, setServings] = useState<number>(1);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const recipeId = params.id as string;
//         if (recipeId) {
//             fetchRecipeDetails(Number(recipeId));
//         }
//     }, [params.id]);

//     const fetchRecipeDetails = async (recipeId: number) => {
//         try {
//             const response = await api.get(`/recipes/${recipeId}`);
//             setRecipe(response.data.data);
//         } catch (error) {
//             informationError(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleServingsChange = async (newServings: number) => {
//         const recipeId = params.id as string;
//         if (recipeId) {
//             setServings(newServings);
//             await fetchRecipeDetails(Number(recipeId), newServings);
//         }
//     };

//     if (loading) return <div>Carregando...</div>;
//     if (error) return <div>{error}</div>;
//     if (!recipe) return <div>Receita não encontrada</div>;

//     console.log('recipe: ', recipe);

//     return (
//         <div className="container mx-auto p-4">
//             <div className="flex justify-start gap-4 md:justify-end mb-4">
//                 <Link href="/admin/recipes">
//                     <Button variant="outline" className="text-orange-500 hover:text-orange-600 font-bold">
//                         <ArrowLeft /> Voltar
//                     </Button>
//                 </Link>
//                 <ToastContainer />
//             </div>
//             <Card className="p-6">
//                 <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>

//                 <div className="flex items-center gap-4 mb-4">
//                     <label htmlFor="servings" className="font-semibold">Porções:</label>
//                     <input
//                         id="servings"
//                         type="number"
//                         min="1"
//                         value={servings}
//                         onChange={(e) => setServings(Number(e.target.value))}
//                         className="w-20 p-2 border rounded"
//                     />
//                     <Button onClick={handleServingsChange}>Recalcular</Button>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                         <h2 className="font-semibold">Informações da Receita</h2>
//                         <p>Custo Total: R$ {recipe?.total_cost}</p>
//                         <p>Custo por Porção: R$ {recipe?.cost_per_serving}</p>
//                         <p>Número de Porções: {recipe?.servings}</p>
//                     </div>

//                     <div>
//                         <h2 className="font-semibold">Utensílios Necessários</h2>
//                         <ul>
//                             {typeof recipe.required_utensils === 'string'
//                                 ? [recipe.required_utensils].map((utensil, index) => (
//                                     <li key={index}>{utensil}</li>
//                                 ))
//                                 : recipe.required_utensils?.map((utensil, index) => (
//                                     <li key={index}>{utensil}</li>
//                                 ))
//                             }
//                         </ul>
//                         {/* <ul>
//                             {recipe?.required_utensils?.map((utensil, index) => (
//                                 <li key={index}>{utensil}</li>
//                             ))}
//                         </ul> */}
//                     </div>
//                 </div>

//                 <h2 className="text-xl font-bold mb-2">Método de Preparo</h2>
//                 <p className="mb-4">{recipe.preparation_method}</p>

//                 <h2 className="text-xl font-bold mb-2">Ingredientes</h2>
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Ingrediente</TableHead>
//                             <TableHead>Quantidade</TableHead>
//                             <TableHead>Unidade</TableHead>
//                             <TableHead>Custo</TableHead>
//                             <TableHead>Kcal</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {recipe?.ingredients?.map((ingredient) => (
//                             <TableRow key={ingredient.id}>
//                                 <TableCell>{ingredient.description}</TableCell>
//                                 <TableCell>{ingredient?.adjusted_quantity?.toFixed(2)}</TableCell>
//                                 <TableCell>{ingredient.unit_of_measure}</TableCell>
//                                 <TableCell>R$ {ingredient?.adjusted_cost?.toFixed(2)}</TableCell>
//                                 <TableCell>{ingredient.kcal}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Card>
//         </div>
//     );
// };

// export default RecipeView;




//     "id": 2,
//     "name": "eeee",
//     "preparation_method": "eeee",
//     "required_utensils": "eeee",
//     "prep_time": 0,
//     "created_by": 2,
//     "servings": 1,
//     "school_id": 1,
//     "total_cost": "6666.00",
//     "created_at": "2024-12-06T20:56:03.000Z",
//     "updated_at": "2024-12-06T20:56:03.000Z",
//     "created_by_name": "Cássio Tadeu - State Adm",
//     "school_name": "Escola Municipal POA",
//     "metrics": {
//         "cost_per_serving": 6666,
//         "total_ingredients": 1,
//         "average_ingredient_cost": 6666
//     },
//     "ingredients": [
//         {
//             "quantity": "6666.00",
//             "unit_of_measure": "g",
//             "total_cost": 6666,
//             "inventory_id": 1,
//             "ingredient_description": "Ovo",
//             "legend_type": "Aquisição proibida",
//             "gross_weight": "10000.00",
//             "correction_factor": "125.00",
//             "cooked_weight": "2200.00",
//             "cooking_index": "3300.00",
//             "kcal": "12225.00",
//             "kj": "22200.00",
//             "protein": "10000.00",
//             "lipids": "3300.00",
//             "carbohydrate": "10000.00",
//             "calcium": "1100.00",
//             "iron": "1100.00",
//             "retinol": "10000.00",
//             "vitaminC": "3300.00",
//             "sodium": "10000.00",
//             "brand": "naturovos",
//             "unit_price": "50.00",
//             "expiration_date": "2025-01-02T03:00:00.000Z",
//             "cost_per_serving": 6666
//         }
//     ]
// }