package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dao.FitnessDao;
import entities.Fitness;

@Controller
public class FitnessController {
	@Autowired
	FitnessDao fitnessDao;
	@ResponseBody
	@RequestMapping("ping")
	public String ping(){
		return "pong";
	}
	@ResponseBody
	@RequestMapping(path="getfitness/{exercise}", method=RequestMethod.GET)
	public List<Fitness> getFitnessByName(@PathVariable("exercise") String fitness){
		return fitnessDao.getFitnessByExercise(fitness);
	}
	@ResponseBody
	@RequestMapping(path="fitness", method=RequestMethod.GET)
	public List<Fitness> getAllFitness(){
		return fitnessDao.getAllFitness();
	}
	@ResponseBody
	@RequestMapping(path="steps")
	public Integer getAverageSteps(){
		return fitnessDao.getAverageSteps();
	}
	@ResponseBody
	@RequestMapping(path="addFitness", method=RequestMethod.PUT)
	public Boolean addFitness(@RequestBody Fitness fit){
		return fitnessDao.addFitness(fit);
	}
	@ResponseBody
	@RequestMapping(path="deleteFitness/{id}", method= RequestMethod.DELETE)
	public Boolean deleteFitness(@PathVariable int id){
		
		System.out.println(id + " IN CONTROLLLER");
		return fitnessDao.deleteFitness(id);
	}
	@ResponseBody
	@RequestMapping(path="updateFitness/{id}", method=RequestMethod.POST)
	public Boolean updateFitness(@PathVariable int id, @RequestBody Fitness fit){
		return fitnessDao.updateFitness(id, fit);
	}
	@ResponseBody
	@RequestMapping(path="fitness/{id}", method=RequestMethod.GET)
	public Fitness getFitnessById(@PathVariable int id){
		return fitnessDao.getById(id);
	}
}
