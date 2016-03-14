package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.transaction.annotation.Transactional;

import entities.Fitness;

@Transactional
public class FitnessDao {
	@PersistenceContext
	private EntityManager em;
	
	public List<Fitness> getFitnessByExercise(String fitness){
		TypedQuery<Fitness> tq = em.createNamedQuery("Fitness.getByName", Fitness.class);
		tq.setParameter("exercise", fitness);
		return tq.getResultList();
	}
	
	public List<Fitness> getAllFitness(){
		TypedQuery<Fitness> tq = em.createQuery("SELECT f from Fitness f", Fitness.class);
		return tq.getResultList();
	}
	public Boolean addFitness(Fitness fit){
		em.persist(fit);
		if(em.contains(fit)){
			return true;
		}
		return false;
	}
	
	public Boolean updateFitness(int id, Fitness fit){
		fit.setId(id);
		Fitness fitness = em.merge(fit);
		em.persist(fitness);
		System.out.println(em.contains(fitness));
		if(em.contains(fitness)){
			return true;
		}
		
		return false;
	}
	public Boolean deleteFitness(int id){
		Fitness fit = getById(id);
		em.remove(fit);
		if(!em.contains(fit)){
			return true;
		}
		return false;
	}
	public Fitness refreshFitness(Fitness fit){
		fit = em.merge(fit);
		em.refresh(fit);
		return fit;
	}
	public Fitness getById(int id){
		return em.find(Fitness.class, id);
	}
	
	public int getAverageSteps(){
		List<Fitness> fit = getAllFitness();
		int sum = 0;
		for (Fitness fitness : fit) {
			sum += fitness.getSteps();
		}
		int avg = sum/fit.size();
		return avg;
	}
}
