import { Request, Response } from 'express';
import { query, close } from '../utils/database';

export async function getAllRecipes(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM recipes');
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    close();
  }
}

export async function getRecipe(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM recipes WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    close();
  }
}

export async function createRecipe(req: Request, res: Response) {
  try {
    const result = await query(
      'INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.ingredients, req.body.instructions]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    close();
  }
}

export async function updateRecipe(req: Request, res: Response) {
  try {
    const result = await query(
      'UPDATE recipes SET name = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
      [req.body.name, req.body.ingredients, req.body.instructions, req.params.id]
    );
    if (result.rowCount > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    close();
  }
}

export async function deleteRecipe(req: Request, res: Response) {
  try {
    const result = await query('DELETE FROM recipes WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
      res.send({ message: 'Recipe deleted' });
    } else {
      res.status(404).send({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    close();
  }
}
